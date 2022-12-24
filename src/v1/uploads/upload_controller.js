const upload = require("../middleware/upload");

exports.multipleUpload = async (req, res, next) => {
    try {
        await upload(req, res);

        if (req.files.length <= 0) {
            const error = new Error("Please select at least one file.");
            error.statusCode = 400;
            throw error;
        }

        //result path file domain.com/uploads/filename
        const result = req.files.map((file) => {
            return {
                filename: file.filename,
                path: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
            };
        });

        res.json({
            success: true,
            message: 'Upload success',
            data: result
        });
    }
    catch (error) {
        next(error);
    }
    
};

