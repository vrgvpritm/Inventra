const db = require("../config/db");

exports.getSuppliers = (req, res) => {
    db.query(
        "SELECT * FROM suppliers",
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
};

exports.getSupplier = (req, res) => {
    db.query(
        "SELECT * FROM suppliers WHERE id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result[0]);
        }
    );
};

exports.addSupplier = (req, res) => {
    const {
        supplier_name,
        contact_person,
        phone,
        email,
        address
    } = req.body;

    db.query(
        `INSERT INTO suppliers
        (supplier_name,contact_person,phone,email,address)
        VALUES(?,?,?,?,?)`,
        [
            supplier_name,
            contact_person,
            phone,
            email,
            address
        ],
        (err) => {
            if (err) return res.status(500).json(err);

            res.json({
                success: true,
                message: "Supplier Added"
            });
        }
    );
};

exports.updateSupplier = (req, res) => {
    const {
        supplier_name,
        contact_person,
        phone,
        email,
        address
    } = req.body;

    db.query(
        `UPDATE suppliers
        SET
        supplier_name=?,
        contact_person=?,
        phone=?,
        email=?,
        address=?
        WHERE id=?`,
        [
            supplier_name,
            contact_person,
            phone,
            email,
            address,
            req.params.id
        ],
        (err) => {
            if (err) return res.status(500).json(err);

            res.json({
                success: true,
                message: "Supplier Updated"
            });
        }
    );
};

exports.deleteSupplier = (req, res) => {
    db.query(
        "DELETE FROM suppliers WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json(err);

            res.json({
                success: true,
                message: "Supplier Deleted"
            });
        }
    );
};