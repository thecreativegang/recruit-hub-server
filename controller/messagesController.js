const Messages = require("../Schemas/MessageModal");



exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;

        // const data = await Messages.create({
        //     message: { text: message },
        //     users: [from, to],
        //     sender: from,
        // });
        const data = {
            message: { text: message },
            users: [from, to],
            sender: from,
        };
        const saveMessage = new Messages(data);
        const responseMessage = await saveMessage.save(err => {
            if (err) {
                console.log(err);
            }
            else {
                res.json({
                    status: 200,
                    responseMessage
                })
            }
        })

        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        next(ex);
    }
};



exports.getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;

        const messages = await Messages.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
};

