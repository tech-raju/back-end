import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"



const registerUser = asyncHandler( async (req,res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res


  // get user details from frontend
 const {fullName,email,username,password} = req.body
 console.log("email:", email);

//  if(fullName === ""){
//   throw new apiError(400, "fullname is required")
//  }

if (
  [fullName, email, username, password].some((field)=>
  field?.trim() === "")
) {
  throw new apiError(400, "All field are required")
}

  const existedUser = User.findOne({
    $or: [{ username },{ email }]
  })

  if(existedUser){
    throw new apiError(409, "User with email or username already exists")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path
  // console.log(req.files)
  const coverImageLocalPath = req.files?.coverImage[0]?.path

  if(!avatarLocalPath){
    throw new apiError(400, "Avatar file is required")
  }

  // upload file to cloudinary
 const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new apiError(400, "Avatar file is required")
  }
  // create user object - create entry in db
  const user = await username.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  // remove password and refresh token

  const createUser = await user.findById(user._id).select(
    "-password -refreshToken"
  )

  // check for user creation
  if(!createUser){
    throw new apiError(500, "something went wrong while registering the user" )
  }

  // return res
  
  return res.status(201).json(
      new apiResponse(200,createUser, "User registered successfully")
  )
})

export {registerUser}