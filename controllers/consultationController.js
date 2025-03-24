// Import required models
import Consultation from '../models/Consultation.js';
import Professional from '../models/Professional.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

export const requestConsultation = async (req, res) => {
  const { userId, professionalId, details , meetingDate, meetingTime, meetingDay } = req.body;

  try {
    
    const user = await User.findByPk(userId);
    const professional = await Professional.findByPk(professionalId);

    if (!user || !professional) {
      return res.status(404).json({ message: 'User or Professional not found' });
    }

    const existingConsultation = await Consultation.findOne({
        where: {
          userId,
          professionalId,
          status: 'pending' 
        }
      });
  
      if (existingConsultation) {
        return res.status(400).json({ message: 'You have already sent a consultation request to this professional.' });
      }
 
    const consultation = await Consultation.create({
      userName: user.name,             
      professionalName: professional.name, 
      date: new Date(),               
      status: 'pending',
      details: details || 'No additional details provided',
      meetingDate,   // e.g., "2025-03-30"
      meetingTime,   // e.g., "14:00"
      meetingDay,
      userId: userId,                  
      professionalId: professionalId,   
    });

    res.status(201).json({
      message: 'Consultation requested successfully',
      consultation,
    });

  } catch (error) {
    console.error('Error booking consultation:', error);
    res.status(500).json({ message: 'Failed to request consultation', error });
  }
};

export const getProfessionalConsultations = async (req, res) => {
  try {
    const { id } = req.params;
    const consultations = await Consultation.findAll({
      where: { professionalId: id }
    });
    
    res.status(200).json(consultations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const getUserConsultations = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log('Fetching consultations for user ID:', id); // Debug log

//     const consultations = await Consultation.findAll({
//       where: { userId: Number(id) }, // Ensure ID is a number
//       ///needed 
//     //   include: [
//     //     {
//     //       model: Professional,
//     //       attributes: ['name', 'specialization', 'consultationPrice'],
//     //     },
//     //   ],
//     });

//     console.log('Fetched consultations:', consultations); // Debug log
//     res.status(200).json(consultations);
//   } catch (error) {
//     console.error('Error fetching consultations:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

export const getUserConsultations = async (req, res) => {
  try {
    const { id } = req.params;
    // const { page = 1, limit = 6 } = req.query; // Default limit 4 consultations per page

    console.log('Fetching consultations for user ID:', id); // Debug log

    // const offset = (page - 1) * limit;

    const consultations = await Consultation.findAll({
      where: { userId: Number(id) }
    });

    const totalCount = await Consultation.count({ where: { userId: Number(id) } });

    console.log('Fetched consultations:', consultations); // Debug log

    res.status(200).json({
      consultations,
      totalPages: Math.ceil(totalCount)
    });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateConsultationStatus = async (req,res,next) => {
  const { id } = req.params;
  const { status, meetingDate, meetingTime, meetingLink } = req.body;

  if (!status || !['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status. Status must be accepted or rejected.' });
  }

  try {
    const consultation = await Consultation.findByPk(id);
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found.' });
    }

    consultation.status = status;

    
    if (status === 'accepted' && meetingDate && meetingTime && meetingLink) {
      consultation.meetingDate = meetingDate;
      consultation.meetingTime = meetingTime;
      consultation.meetingLink = meetingLink;
      consultation.status = 'Scheduled';
    }

    await consultation.save();
    return res.status(200).json({ message: 'Consultation status updated successfully.', consultation });
  } catch (error) {
    console.error('Error updating consultation status:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

export const scheduleConsultation = async (req, res,next) => {
  const { consultationId } = req.params;
  const { meetingDate, meetingTime, meetingLink } = req.body;

  try {
    const consultation = await Consultation.findByPk(consultationId);

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    if (consultation.status.toLowerCase() !== 'accepted') {
      return res.status(400).json({ message: 'Consultation must be accepted before scheduling' });
    }
    

 
    consultation.meetingDate = meetingDate;
    consultation.meetingTime = meetingTime;
    consultation.meetingLink = meetingLink;
    consultation.status = 'Scheduled';
    await consultation.save();

    res.status(200).json({ message: 'Consultation scheduled successfully', consultation });
  } catch (error) {
    console.error('Error scheduling consultation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const cancelRequest = async (req,res,next) =>{
  try{
const {id} = req.params;
const consultation = await Consultation.findByPk(id);

if(!consultation){
  return res.status(404).json({error:'Consultation not found '});
}

if(consultation.status !='pending'){
  return res.status(400).json({error: 'Only pending consultation can be canceled'})
}
consultation.status = 'canceled';
await consultation.save();

 res.json({message: ' Cconsultation canceled sucessfully'});
  }
  catch(err){
    console.log("Error canceling the consultation" ,err);
    res.status(500).json({err :'Internal server error'})
    
  }
}

export const DeletingtheConsult = async (req,res,next)=>{
  const { id } = req.params;

  try {
    const consultation = await Consultation.findByPk(id);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    await consultation.destroy();
    res.json({ message: 'Consultation deleted successfully' });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
export const acceptConsultation = async (req, res) => {
  try {
    const { consultationId } = req.params;
    console.log("Accepting consultation with ID:", consultationId);
    
    // Find the consultation
    const consultation = await Consultation.findByPk(consultationId);
    if (!consultation) {
      console.error("Consultation not found.");
      return res.status(404).json({ message: 'Consultation not found.' });
    }
    
    // Update status to 'Accepted'
    consultation.status = 'Accepted';
    await consultation.save();
    console.log("Consultation status updated.");

    // Get user details
    const user = await User.findByPk(consultation.userId);
    if (!user) {
      console.error("User not found.");
      return res.status(404).json({ message: 'User not found.' });
    }
    console.log("User found:", user.email);

    // Set up transporter (using your Gmail credentials)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '7777vishalprajapat@gmail.com',
        pass: 'tacx pwmi erfk owyf', // Use your app password here
      },
    });

    try {
      await transporter.verify();
      console.log("Transporter verified successfully.");
    } catch (verifyError) {
      console.error("Transporter verification failed:", verifyError);
      return res.status(500).json({ message: 'Error configuring email service.' });
    }

    // Use schedule fields (if provided)
 // Format meeting date and time for a user-friendly email message.
const formattedMeetingDate = consultation.meetingDate 
? new Date(consultation.meetingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
: 'To be scheduled';

const formattedMeetingTime = consultation.meetingTime 
? consultation.meetingTime.substring(0, 5) // Assumes consultation.meetingTime is in HH:mm:ss format and trims to HH:mm
: '';

    // Also, include professional contact information if available
    const professionalName = consultation.professionalName || 'N/A';
    const professionalContact = consultation.professionalContact || 'N/A';

    // Define mail options with schedule details and professional contact info
    const mailOptions = {
      from: '7777vishalprajapat@gmail.com',
      to: user.email,
      subject: 'Your Consultation Request is Accepted',
      text: `Hello ${user.name},
    
    Your consultation request has been accepted.
    
    Professional Details:
    - Name: ${professionalName}
    - Contact: ${professionalContact}
    
    Meeting Details:
    - Date: ${formattedMeetingDate} ${formattedMeetingTime}
    
    Please Be active on Given Timing Professional Will Reach You.
    
    Thank you,
    Your App Team`,
    };
    

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully.");
    } catch (mailError) {
      console.error("Error sending mail:", mailError);
      return res.status(500).json({ message: 'Error sending email.' });
    }

    res.json({ message: 'Consultation accepted and email sent to user.', consultation });
  } catch (error) {
    console.error("Error in acceptConsultation:", error);
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
};
