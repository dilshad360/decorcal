import express from "express";
import Client from "../models/Client.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
    const { name, phoneNumber, location, notes } = req.body;

    try {
        const newClient = new Client({
            userId: req.user.id,
            name,
            phoneNumber,
            location,
            notes,
        });

        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        console.error("Error creating client:", error);
        res.status(500).send("Server error");
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const clients = await Client.find({ userId: req.user.id }).sort({
            createdAt: -1,
        });
        res.json(clients);
    } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).send("Server error");
    }
});

// GET /clients/:id - Get a single client by ID
router.get("/:id", auth, async (req, res) => {
    try {
        const client = await Client.findOne({
            _id: req.params.id,
            userId: req.user.id, // Ensure the client belongs to the authenticated user
        });

        if (!client) {
            return res.status(404).send("Client not found or unauthorized");
        }

        res.json(client);
    } catch (error) {
        console.error("Error fetching client:", error);
        res.status(500).send("Server error");
    }
});


// DELETE /clients/:id - Delete a client by ID (only if it belongs to the user)
router.delete("/:id", auth, async (req, res) => {
    try {
        const client = await Client.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id, // Ensure user can only delete their own clients
        });

        if (!client) {
            return res.status(404).send("Client not found or unauthorized");
        }

        res.json({ message: "Client deleted successfully", client });
    } catch (error) {
        console.error("Error deleting client:", error);
        res.status(500).send("Server error");
    }
});

// PUT /clients/:id - Update client details
router.put("/:id", auth, async (req, res) => {
    const { name, phoneNumber, location, notes } = req.body;

    try {
        const client = await Client.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id }, // Ensure only the owner can update
            { name, phoneNumber, location, notes },
            { new: true } // Return the updated client
        );

        if (!client)
            return res.status(404).send("Client not found or unauthorized");

        res.json({ message: "Client updated successfully", client });
    } catch (error) {
        console.error("Error updating client:", error);
        res.status(500).send("Server error");
    }
});

export default router;
