export default {
    validate: function (review){

        let validationResult = {
            isValid: true,
            errors: []
        };

        if (!review || !review.rate){
            validationResult.isValid = false;
            validationResult.errors.push({
                key: "rate",
                value: "Review rate is required",
            });
        }

        if (!review.author){
            validationResult.isValid = false;
            validationResult.errors.push({
                key: "author",
                value: "Review should have an author",
            });
        }

        if (!review.companyId){
            validationResult.isValid = false;
            validationResult.errors.push({
                key: "companyId",
                value: "Company id is required for review"
            });
        }

        if (!review.serviceId){
            validationResult.isValid = false;
            validationResult.errors.push({
                key: "serviceId",
                value: "Service id is required for review"
            });
        }

        return validationResult;
    }
} 