import { ROLE_PERMISSION } from "../../config/permission.js";
import AppError from "../../utils/AppError.js";

function authorize(requiredPermission){
    return (req, res, next)=>{
        try {
            const userPermissions = ROLE_PERMISSION[ req.scope.role ] || [];
            if(!userPermissions.includes(requiredPermission)){
                return next(new AppError('Forbidden: Insufficient privileges', 403));
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};

export default authorize;