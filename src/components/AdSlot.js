import { motion } from "framer-motion";

// Sample Blog Content for 3 options
const blogContents = {
  option1: `
    Building a Solid Resume: Key Steps to Craft a Winning CV

    Your resume is your personal marketing tool — it's your first opportunity to impress a potential employer. 
    A great resume not only highlights your qualifications but also presents you as a professional who understands the role you're applying for. 

    1. Keep it concise: Limit your resume to one or two pages. Be direct and focus on the most important information that highlights your skills, experience, and achievements.

    2. Tailor your resume to the job: A generic resume won't cut it. Customize your resume for each position you're applying to by focusing on the skills and experience that directly relate to the job description.

    3. Showcase accomplishments, not just responsibilities**: Instead of listing duties, show how your work impacted the company. Did you increase sales, improve processes, or contribute to a project’s success?

    4. Use action verbs: Words like "achieved," "led," "developed," and "managed" showcase your active role in your past experiences.

    5. Proofread: Typos and grammatical errors can leave a bad impression. Always proofread your resume before submitting it.

    6. Include key sections: Make sure your resume has the following sections: contact information, a professional summary, work experience, education, and skills.

    Your resume should always be evolving as you gain more experience. Keep it up-to-date, and remember to keep it relevant and focused on what you can bring to the role.
  `,
  
  option2: `
    Nailing the Interview: Tips to Boost Your Chances

    Preparing for an interview can feel like a daunting task, but with the right preparation, you can walk into the room (or virtual meeting) with confidence. 

    1. Research the company: Understand the company’s mission, values, and products. The more you know, the better you'll be able to answer questions and align your experience with the company’s needs.

    2. Practice common questions: Prepare for common interview questions like “Tell me about yourself,” “What are your strengths and weaknesses?”, and “Why should we hire you?”. Practicing your responses will help you sound more confident.

    3. Focus on your strengths: Think about the key strengths and skills that will help you succeed in the role. Be ready to explain why you are the best candidate based on your past experience.

    4. Prepare questions for them: Asking insightful questions shows you're engaged and serious about the opportunity. Some great questions include, "What does success look like in this role?" and "What are the biggest challenges the company is facing?"

    5. Practice active listening: Pay close attention to the interviewer’s questions and responses. This will help you give thoughtful answers and make the conversation feel more natural.

    6. Dress appropriately: Whether the interview is in-person or virtual, dress professionally. Dressing for the job you want shows you take the opportunity seriously.

    7. Follow up: After the interview, send a thank-you email. This shows gratitude for their time and reinforces your interest in the role.

    The key to acing an interview is preparation. The more you practice, the more confident you'll feel when the time comes.
  `,
  
  option3: `
    Networking: How to Build Meaningful Connections for Job Success

    Networking isn’t just about handing out business cards or attending events—it’s about building meaningful relationships that can help advance your career. Here’s how you can make networking work for you:

    1. Leverage LinkedIn: LinkedIn is an invaluable tool for connecting with professionals in your field. Be sure to have a complete and up-to-date profile that showcases your skills, achievements, and career journey.

    2. Attend industry events and webinars: Networking is about meeting people face-to-face (or virtually). Look for conferences, seminars, and webinars where professionals in your industry gather. You’ll meet people who can offer guidance, collaboration, or even job leads.

    3. Reach out to alumni: Your college alumni network can be a powerful resource. Reach out to alumni working in roles or industries you're interested in. Most people are willing to help fellow alumni with advice or introductions.

    4. Volunteer or contribute to community events: Volunteering is a great way to meet people while also giving back. Whether you’re volunteering at an industry conference or helping out with a local nonprofit, you're likely to meet people who share your interests.

    5. Offer value: Networking isn't just about asking for help. When connecting with others, think about how you can offer value first. Whether it’s sharing an article, offering advice, or making a connection, giving first can open doors in the long run.

    6. "Follow up": After meeting someone, always follow up with a brief message or LinkedIn connection request. Personalize the message to remind them where you met and express interest in staying in touch.

    7. "Build a network, not just a contact list": The goal of networking is to build long-term relationships, not to simply collect business cards. Cultivate genuine connections, and don’t be afraid to reach out to people even when you don’t need something right away.

    Networking is all about building relationships that can support you throughout your career. Be patient, stay consistent, and remember that every connection counts.
  `,
};


export default function BlogPage() {
  return (
    <div className="container my-5">
      {/* Grid Items - Single Row at a Time */}
      <div className="row g-4">
        {/* First Grid Item (One Grid per Row) */}
        <div className="col-md-12 mb-4">
          <div className="card shadow-sm p-4 text-center" style={cardStyle}>
            <div className="card-inner">
              {/* Front of Card */}
              <div className="card-front">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScAzgKt-qo_C8E2iygU_56ExnY1tVQnJkRdw&s"
                  alt="Resume Tips"
                  className="card-img-top"
                  style={imageStyle}
                />
                <div className="card-body">
                  <h5 className="card-title">Build a Solid Resume</h5>
                  <p className="card-text">Learn how to craft a resume that gets you noticed.</p>
                </div>
              </div>

              {/* Back of Card */}
              <div className="card-back">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="content"
                >
                  <h3>Blog Content</h3>
                  <div className="scrollable-content">{blogContents.option1}</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Grid Item */}
        <div className="col-md-12 mb-4">
          <div className="card shadow-sm p-4 text-center" style={cardStyle}>
            <div className="card-inner">
              {/* Front of Card */}
              <div className="card-front">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSdtp9rCOKwpR-R9ndE7JxlA9lV8GW9VG59w&s"
                  alt="Interview Preparation"
                  className="card-img-top"
                  style={imageStyle}
                />
                <div className="card-body">
                  <h5 className="card-title">Interview Preparation</h5>
                  <p className="card-text">Get ready for interviews with these tips and strategies.</p>
                </div>
              </div>

              {/* Back of Card */}
              <div className="card-back">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="content"
                >
                  <h3>Blog Content</h3>
                  <div className="scrollable-content">{blogContents.option2}</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Grid Item */}
        <div className="col-md-12 mb-4">
          <div className="card shadow-sm p-4 text-center" style={cardStyle}>
            <div className="card-inner">
              {/* Front of Card */}
              <div className="card-front">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThOKFLuLx_tu24JlGj6ca6SVKW_4ujHkmOXg&s"
                  alt="Networking"
                  className="card-img-top"
                  style={imageStyle}
                />
                <div className="card-body">
                  <h5 className="card-title">Networking for Job Seekers</h5>
                  <p className="card-text">Discover the power of networking in your job search.</p>
                </div>
              </div>

              {/* Back of Card */}
              <div className="card-back">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="content"
                >
                  <h3>Blog Content</h3>
                  <div className="scrollable-content">{blogContents.option3}</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles for Flip Effect */}
      <style>{`
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .card:hover .card-inner {
          transform: rotateY(180deg);
        }

        .card-front, .card-back {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          backface-visibility: hidden;
        }

        .card-front {
          background-color: #ecf0f1;
        }

        .card-back {
          background-color: #f8f9fa;
          transform: rotateY(180deg);
          padding: 20px;
        }

        .card-front img {
          border-radius: 10px;
          object-fit: cover;
          height: 200px;
        }

        .card-body {
          padding: 10px;
        }

        /* Scrollable content for long text */
        .scrollable-content {
          max-height: 200px;  /* Adjust as needed */
          overflow-y: auto;
          padding-right: 10px;
        }
      `}</style>
    </div>
  );
}

// Styles
const cardStyle = {
  cursor: "pointer",
  backgroundColor: "#ecf0f1",
  borderRadius: "10px",
  position: "relative",
  overflow: "hidden",
  height: "350px", // Ensure height for card to fit content
};

const imageStyle = {
  borderRadius: "10px",
  objectFit: "cover",
  height: "200px",
};
