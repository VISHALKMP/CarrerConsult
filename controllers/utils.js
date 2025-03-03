
// import Admin from "../models/Admin.js";
// import Professional from "../models/Professional.js";
// import User from "../models/User.js";
// import Consultation from "../models/Consultation.js";
// import Rating from "../models/Rating.js";

// // utils.js

// export async function retryTransaction(model, retries = 3, delay = 1000) {
//     for (let i = 0; i < retries; i++) {
//         try {
//             await model.sync();
//             break;
//         } catch (error) {
//             if (error.original.code === 'ER_LOCK_DEADLOCK' && i < retries - 1) {
//                 await new Promise(resolve => setTimeout(resolve, delay));
//             } else {
//                 throw error;
//             }
//         }
//     }
// }

// await retryTransaction(Admin);
// await retryTransaction(Professional);
// await retryTransaction(User);
// await retryTransaction(Consultation);
// await retryTransaction(Rating);

