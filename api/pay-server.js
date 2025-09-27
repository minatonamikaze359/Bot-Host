let servers = [];

export default function handler(req, res) {
    if (req.method === "POST") {
        const { serverId } = req.body;
        const server = servers.find(s => s.serverId === serverId);
        if (!server) return res.status(404).json({ message: "Server not found" });

        server.paid = true;
        return res.status(200).json({ message: "Payment successful! Server will remain active." });
    }
    res.status(405).json({ message: "Method not allowed" });
}
