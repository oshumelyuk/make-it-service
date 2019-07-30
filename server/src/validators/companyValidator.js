export default {
    validate: function (company){

        let validationResult = {
            isValid: true,
            errors: []
        };

        if (!company || !company.name || company.name.length > 256){
            validationResult.isValid = false;
            validationResult.errors.push({
                key: "name",
                value: "Company name is requred and should be a string limited to 256 symbols",
            });
        }

        if (!company.services || company.services.length < 1){
            validationResult.isValid = false;
            validationResult.errors.push({
                key: "services",
                value: "Company should provide at least one service"
            });
        }

        return validationResult;
    }
} 