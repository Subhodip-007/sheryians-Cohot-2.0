import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/user/",
    withCredentials: true
});

export async function getFeed() {
    const response = await api.get("/post/feed");

    console.log("Axios response:", response);
    console.log("Feed payload:", response.data);

    return response.data;
}
export async function createPost(file,caption) {
    // fram frontend we cant directl send 
    // const response = await axios.post("/postCreation",{
    //     file ,
    //     caption
    // })
    const formData = new FormData()
    formData.append("img",file)
    formData.append("caption",caption)

    const response = await api.post("/postCreation",formData)
    return response.data
}
export async function likePost(postID){
    const response = await api.post("/post/like/"+postID)
    return response.data

}
export async function unlikePost(postID){
    const response = await api.post("/post/unlike/"+postID)
    return response.data

}
// /api/user/post/unlike/:postID