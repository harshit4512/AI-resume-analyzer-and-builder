import { createResumeService,getSingleResumeService,getUserResumeService,updateResumeService,deleteResumeService } from "../services/resume.service.js";

// create resume
const createResume= async(req,res)=>{
    try{
        const resume = await createResumeService(req.body,req.user._id);
        res.status(201).json({
            message:"resume created successfully",
            resume
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
};

// get all resumes

const getUserResume= async(req,res)=>{
    try{
        const resumes = await getUserResumeService(req.user._id);
        res.status(200).json({
            message:"fetched all resumes",
            resumes
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        })
    }
};

// get single resumes


const getSingleResume = async (req,res)=>{
    try{
        const resume=await getSingleResumeService(
         req.params.id,
         req.user._id
        );

        if(!resume){
            return res.status(404).json({
                message:"resume not found"
            });
        }
        res.status(200).json({
            message:"single resume fetched",
            resume
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        });
    }
}

// update resume


const updateResume= async(req,res)=>{
    try{
        const updated = await updateResumeService(
            req.params.id,
            req.body,
            req.user._id
        );

        if(!updated){
            return res.status(404).json({
                message:"resume not found"
            });

        }
            res.status(200).json({
                message:"resume updated successfully",
                updated
            })
    }
    catch(err){
        res.status(400).json({
            message:err.message
        });
    }
}

const deleteResume = async(req,res)=>{
    try{
        const deleted= await deleteResumeService(
            req.params.id,
            req.user._id
        );

        if(!deleted){
            return res.status(404).json({
                message:"resume not found"
            })
        }

        res.status(200).json({
            message:"resume deleted successfully"
        });
    }
    catch(err){
        res.status(400).json({
            message:err.message
        });
    }
}

export {
    createResume,
    getUserResume,
    getSingleResume,
    updateResume,
    deleteResume,
}