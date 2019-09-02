export default {
    validate: function (service){
        
        const MAX_WORKING_HOURS_IN_DAY = 10;
        const MINUTES_IN_HOUR = 60;
        const MIN_SERVICE_DURATION = 10;
        const MAX_SERVICE_DURATION = MINUTES_IN_HOUR * MAX_WORKING_HOURS_IN_DAY;

        let validationResult = {
            isValid: true,
            errors: []
        };

        if (!service || !service.name || service.name.length > 256){
            validationResult.isValid = false;
            validationResult.errors.push({
                key: "name",
                value: "Service name is requred and should be a string limited to 256 symbols",
            });
        }

        
        if (!service.duration || service.duration <= MIN_SERVICE_DURATION || service.duration >= MAX_SERVICE_DURATION){
            validationResult.isValid = false;
            validationResult.errors.push({
                key: "duration",
                value: `Service duration is required and should be between ${MIN_SERVICE_DURATION} min and ${MAX_SERVICE_DURATION} min`
            });
        }

        return validationResult;
    }
} 