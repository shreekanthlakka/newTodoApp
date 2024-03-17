const todoValidationSchema = {
    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Title cannot be empty",
        },
        exists: {
            errorMessage: "Title field required",
        },
    },
    description: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Description cannot be empty",
        },
        exists: {
            errorMessage: "Field must exist",
        },
    },
    owner: {
        in: ["body"],
    },
};

export { todoValidationSchema };
