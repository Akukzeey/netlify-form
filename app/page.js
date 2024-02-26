export default function Home() {
  return (
   <div>
     <form name="register" data-netlify="true" method='post' data-netlify-honeypot='bot-field'>
       <input type='hidden' name='form-name' value='register'/>
       <div hidden>
         <input name='bot-field'/>
       </div>
       <div className="mb-lg-4 mb-md-3 mb-2">
         <label htmlFor="your-name" className="form-label">Your Name</label>
         <input type="text" className="form-control" id="your-name" name='your-name' required/>
       </div>
       <div className="mb-lg-4 mb-md-3 mb-2">
         <label htmlFor="email" className="form-label">Your Email</label>
         <input type="email" className="form-control" id="email" name='user-email' required/>
       </div>
       <div className='mb-lg-4 mb-md-3 mb-2'>
         <label htmlFor="phone-number" className="form-label">Number</label>
         <input type="tel" className="form-control" id="phone-number" required/>
       </div>
       <div className='d-flex justify-content-center'>
         <input type="submit" className='btn sign-up-btn' value='Sign Up'/>
       </div>
     </form>
   </div>
  );
}
