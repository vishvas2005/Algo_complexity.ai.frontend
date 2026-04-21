import axios from "axios";
const Base_url = "https://algocomplexityai-production.up.railway.app";

const api = axios.create({
  baseURL : Base_url,
  headers:{
  'Content-Type':'application/json',
  },
})

export const Auditservice = ({
 analyzeRepo : async(repoUrl) =>{
    try{
    const response = await api.post('/analyze-repo' , {
        repo_url : repoUrl
    });
    return response.data;
    }catch(error){
    console.error("API Error (Analyze Repo):", error.response?.data || error.message
    );
    throw error;
    } 
 }
})

predictSingle: async (code, filename) => {
    try {
        const response = await api.post('/predict', {
            code: code,
            filename: filename
        });
        return response.data;
    } catch (error) {
        console.error("API Error (Single Predict):", error.response?.data || error.message);
        throw error;
    }
};
export default api;