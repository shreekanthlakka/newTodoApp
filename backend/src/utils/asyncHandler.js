const asyncHandler = (func) => {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler };

// const asyncHandler = (fun) => async (req, res, next) => {
//     try {
//         await fun(req, res, next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message || "Internal Server Error",
//         });
//     }
// };

// const asyncHan = (fun) => {
//     return async (req, res, next) => {
//         try {
//             await fun(req, res, next);
//         } catch (error) {
//             res.status(err.code || 500).json({
//                 success: false,
//                 message: err.message || "Internal Server Error",
//             });
//         }
//     };
// };
