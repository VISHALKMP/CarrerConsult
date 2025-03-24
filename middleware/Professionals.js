import Professional from '../models/Professional.js';

export const regProff = async (req, res,next) => {
  
    const { name, email,password, contact, qualification, experience, specialization, consultationPrice} = req.body;
   
    const existingProfessional = await Professional.findOne({ where: { email } });
    if (existingProfessional) {
      return res.status(400).json({ message: 'Email already exists'  });
    }

    if (!name || !email || !password|| !contact || !qualification || !experience || !specialization || !consultationPrice) {
        console.log(req.body);
        return res.status(400).json({ message: 'All fields are required' });
        
    } else {
        next();
    }
};
