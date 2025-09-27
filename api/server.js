let servers = [];

export default function handler(req, res) {
    const serverId = "srv_" + Date.now();
    const creationDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(creationDate.getDate() + 7);

    servers.push({ serverId, creationDate, expiryDate, paid: false });

    res.status(200).json({
        message: "Server created successfully!",
        serverId,
        expires: expiryDate
    });
}
