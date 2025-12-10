// "use client";
//
// import {useAddNewPassword} from "@/hooks/useAddNewPassword";
// import NavBar from "@/components/navbar/Navbar";
//
// export default function ResetPasswordPage() {
//   const { handleSubmit,showing, setShowing, setPassword} = useAddNewPassword()
//
//   return (
//       <div>
//         <NavBar />
//         <div className=" mt-12 flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Create New Password
//         </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="text-sm font-medium text-gray-600">
//                 Enter your new Password:
//               </label>
//
//               <div className="relative">
//                 <input
//                   type={showing ? "text" : "password"}
//                   required
//                   className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 mt-1 pr-10"
//                   placeholder="Enter new password"
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//
//                 {/* Toggle Button */}
//                 <button
//                   type="button"
//                   onClick={() => setShowing(!showing)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                 >
//                   {showing ? "hide" : "show"}
//                 </button>
//               </div>
//             </div>
//
//             <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
//               Reset Password
//             </button>
//           </form>
//
//       </div>
//     </div>
//       </div>
//
//   );
// }

"use client";

import { useAddNewPassword } from "@/hooks/useAddNewPassword";
import NavBar from "@/components/navbar/Navbar";
import PasswordField from "@/components/ui/PasswordField";

export default function ResetPasswordPage() {
  const { handleSubmit, setPassword, password } = useAddNewPassword();

  return (
      <div>
        <NavBar />
        <div className="mt-12 flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Create New Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <PasswordField
                  label="Enter your new Password:"
                  id="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  showPasswordCriteria={true}  // show your password rules
              />

              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}

