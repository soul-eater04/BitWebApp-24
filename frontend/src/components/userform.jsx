import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UserForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [semester, setSemester] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [abcId, setabcId] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [codingProfiles, setCodingProfiles] = useState({
    github: "",
    leetcode: "",
    codeforces: "",
    codechef: "",
    atcoder: ""
  });
  const [resume, setResume] = useState(null);
  const [user, setUser ] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [availableSections, setAvailableSections] = useState([]);
  
  // Alumni section state
  const [graduationYear, setGraduationYear] = useState("");
  const [workExperiences, setWorkExperiences] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/users/get-user")
      .then(response => {
        const userData = response.data.data;
        setFullName(userData.fullName);
        setEmail(userData.email);
        setBranch(userData.branch);
        setSection(userData.section);
        setMobileNumber(userData.mobileNumber);
        setSemester(userData.semester);
        setCgpa(userData.cgpa);
        setabcId(userData.abcId);
        setlinkedin(userData.linkedin || "");
        setCodingProfiles({
          github: userData.codingProfiles?.github || "",
          leetcode: userData.codingProfiles?.leetcode || "",
          codeforces: userData.codingProfiles?.codeforces || "",
          codechef: userData.codingProfiles?.codechef || "",
          atcoder: userData.codingProfiles?.atcoder || "",
        });
        setUser (userData);
        setAvailableSectionsBasedOnBranch(userData.branch);
        if (userData.semester === "Graduated") {
          setGraduationYear(userData.graduationYear || "");
          setWorkExperiences(userData.workExperiences || []);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const setAvailableSectionsBasedOnBranch = (branch) => {
    if (branch === "artificial intelligence and machine learning") {
      setAvailableSections(["A"]);
    } else {
      setAvailableSections(["A", "B", "C"]);
    }
  };

  const handleUpdate = () => {
    console.log("Updating user details...");

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("branch", branch);
    formData.append("section", section);
    formData.append("mobileNumber", mobileNumber);
    formData.append("semester", semester);
    formData.append("cgpa", cgpa);
    formData.append("abcId", abcId);
    formData.append("linkedin", linkedin);
    formData.append("github", codingProfiles.github);
    formData.append("leetcode", codingProfiles.leetcode);
    formData.append("codeforces", codingProfiles.codeforces);
    formData.append("atcoder", codingProfiles.atcoder);
    formData.append("codechef", codingProfiles.codechef);
    if (resume) {
      formData.append("resume", resume);
    }
    if (profilePicture) {
      formData.append("image", profilePicture);
    }
    if (semester === "Graduated") {
      formData.append("graduationYear", graduationYear);
      formData.append("workExperiences", JSON.stringify(workExperiences));
    }

    axios.patch(`/api/v1/users/update`, formData, {
      headers: {
        ' Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message
        });
      })
      .catch(error => {
        console.log(error);
      });
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setFullName(user.fullName);
    setEmail(user.email);
    setBranch(user.branch);
    setSection(user.section);
    setMobileNumber(user.mobileNumber);
    setSemester(user.semester);
    setCgpa(user.cgpa);
    setabcId(user.abcId);
    setlinkedin(user.linkedin || "");
    setCodingProfiles({
      github: user.codingProfiles?.github || "",
      leetcode: user.codingProfiles?.leetcode || "",
      codeforces: user.codingProfiles?.codeforces || "",
      codechef: user.codingProfiles?.codechef || "",
      atcoder: user.codingProfiles?.atcoder || ""
    });
    setResume(null);
    setProfilePicture(null);
    setGraduationYear("");
    setWorkExperiences([]);
    setIsEditMode(false);
  };

  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, { companyName: "", startYear: "", endYear: "", role: "", description: "" }]);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index][field] = value;
    setWorkExperiences(updatedExperiences);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full flex flex-col p-10 justify-between">
        <h3 className="text-xl text-black font-semibold">BIT WEB APP</h3>
        <div className="w-full flex flex-col">
          <div className="flex flex-col w-full mb-5">
            <h3 className="text-3xl font-semibold mb-4">Your Profile</h3>
            <p className="text-base mb-2">Enter Your details.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* Full Name */}
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setFullName(e.target.value)}
              disabled={!isEditMode}
              placeholder="Enter your full name"
            />

            {/* Email */}
            <label>Email</label>
            <input
              type="email"
              value={email}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditMode}
              placeholder="Enter your email"
            />

            {/* Branch */}
            <label>Branch</label>
            <select
              value={branch}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setBranch(e.target.value)}
              disabled={!isEditMode}
            >
              <option value="computer science">Computer Science</option>
              <option value="artificial intelligence and machine learning">
                AI and ML
              </option>
            </select>

            {/* Section */}
            <label>Section</label>
            <select
              value={section}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setSection(e.target.value)}
              disabled={!isEditMode}
            >
              {availableSections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>

            {/* Mobile Number */}
            <label>Mobile Number</label>
            <input
              type="tel"
              value={mobileNumber}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setMobileNumber(e.target.value)}
              disabled={!isEditMode}
              placeholder="Enter your mobile number"
            />

            {/* Semester */}
            <label>Semester</label>
            <select
              value={semester}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setSemester(e.target.value)}
              disabled={!isEditMode}
            >
              <option value="">Select Semester</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
              <option value="Graduated">Graduated</option>
            </select>

            {/* CGPA */}
            <label>CGPA</label>
            <input
              type="number"
              value={cgpa}
              step="0.01"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setCgpa(e.target.value)}
              disabled={!isEditMode}
              placeholder="Enter your CGPA"
            />

            {/* ABC ID */}
            <label>ABC ID</label>
            <input
              value={abcId}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setabcId(e.target.value)}
              disabled={!isEditMode}
              placeholder="Enter ABC ID"
            />

            {/* LinkedIn Profile */}
            <label>LinkedIn Profile</label>
            <input
              type="url"
              value={linkedin}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setlinkedin(e.target.value)}
              disabled={!isEditMode}
              placeholder="Enter LinkedIn Profile URL"
            />

            {/* Coding Profiles */}
            <label>GitHub Profile</label>
            <input
              type="url"
              value={codingProfiles.github}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setCodingProfiles({ ...codingProfiles, github: e.target.value })}
              disabled={!isEditMode}
              placeholder="Enter GitHub Profile URL"
            />
            <label>LeetCode Profile</label>
            <input
              type="url"
              value={codingProfiles.leetcode}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setCodingProfiles({ ...codingProfiles, leetcode: e.target.value })}
              disabled={!isEditMode}
              placeholder="Enter LeetCode Profile URL"
            />
            <label>Codeforces Profile</label>
            <input
              type="url"
              value={codingProfiles.codeforces}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setCodingProfiles({ ...codingProfiles, codeforces: e.target.value })}
              disabled={!isEditMode}
              placeholder="Enter Codeforces Profile URL"
            />
            <label>Codechef Profile</label>
            <input
              type="url"
              value={codingProfiles.codechef}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setCodingProfiles({ ...codingProfiles, codechef: e.target.value })}
              disabled={!isEditMode}
              placeholder="Enter Codechef Profile URL"
            />
            <label>Atcoder Profile</label>
            <input
              type="url"
              value={codingProfiles.atcoder}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setCodingProfiles({ ...codingProfiles, atcoder: e.target.value })}
              disabled={!isEditMode}
              placeholder="Enter Atcoder Profile URL"
            />
            {/* Resume Upload */}
            <label>Upload Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setResume(e.target.files[0])}
              disabled={!isEditMode}
            />

            {/* Profile Picture Upload */}
            <label>Upload Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              disabled={!isEditMode}
            />

            {/* Alumni Section */}
            {semester === "Graduated" && (
              <div className="mt-5">
 <h3 className="text-2xl font-semibold mb-4">Alumni Section</h3>
                <label>Graduation Year</label>
                <input
                  type="text"
                  value={graduationYear}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
                  onChange={(e) => setGraduationYear(e.target.value)}
                  disabled={!isEditMode}
                  placeholder="Enter your graduation year"
                />

                <h4 className="text-xl font-semibold mb-2">Work Experiences</h4>
                {workExperiences.map((experience, index) => (
                  <div key={index} className="mb-4 border p-4 rounded">
                    <label>Company Name</label>
                    <input
                      type="text"
                      value={experience.companyName}
                      className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
                      onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                      disabled={!isEditMode}
                      placeholder="Enter company name"
                    />
                    <label>Start Year</label>
                    <input
                      type="text"
                      value={experience.startYear}
                      className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
                      onChange={(e) => handleExperienceChange(index, 'startYear', e.target.value)}
                      disabled={!isEditMode}
                      placeholder="Enter start year"
                    />
                    <label>End Year</label>
                    <input
                      type="text"
                      value={experience.endYear}
                      className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
                      onChange={(e) => handleExperienceChange(index, 'endYear', e.target.value)}
                      disabled={!isEditMode}
                      placeholder="Enter end year"
                    />
                    <label>Role</label>
                    <input
                      type="text"
                      value={experience.role}
                      className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
                      onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                      disabled={!isEditMode}
                      placeholder="Enter your role"
                    />
                    <label>Description</label>
                    <textarea
                      value={experience.description}
                      className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none"
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      disabled={!isEditMode}
                      placeholder="Enter job description"
                    />
                  </div>
                ))}
                {isEditMode && (
                  <button
                    type="button"
                    className="bg-blue-500 text-white rounded-md p-2"
                    onClick={addWorkExperience}
                  >
                    + Add Work Experience
                  </button>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="w-full flex items-center justify-between mt-4">
              {isEditMode ? (
                <>
                  <button className="bg-green-500 text-white rounded-md p-2" onClick={handleUpdate}>
                    Save
                  </button>
                  <button className="bg-red-500 text-white rounded-md p-2" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="bg-blue-500 text-white rounded-md p-2" onClick={() => setIsEditMode(true)}>
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}