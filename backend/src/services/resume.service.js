import Resume from "../models/resume.model.js"

// create resume 

const createResumeService = async (data,userId)=>{
    const resume = await Resume.create({
        ...data,
        user:userId,
    });

     return resume;
};

const getUserResumeService = async (userId) => {
  return await Resume.find({ user: userId }).sort({ createdAt: -1 });
};

const getSingleResumeService=async (resumeId,userId)=>{
    return await Resume.findOne({
        _id:resumeId,
        user:userId,
    });
};

const updateResumeService =async (resumeId,data,userId)=>{
   return await Resume.findOneAndUpdate(
    {
        _id:resumeId,
        user:userId
    },
    data,
    {
         returnDocument: "after"
    }
   )
};

const deleteResumeService = async (resumeId, userId) => {
  return await Resume.findOneAndDelete({
    _id: resumeId,
    user: userId,
  });
};


export {
   createResumeService,
   getUserResumeService,
   getSingleResumeService,
   updateResumeService,
   deleteResumeService
}



