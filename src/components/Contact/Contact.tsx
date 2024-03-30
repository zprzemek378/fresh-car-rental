import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact-styles.css";
import useLogged from "../../hooks/useLogged";
import useAuth from "../../hooks/useAuth";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";

interface ContactProps {
  setBackgroundImage: (imagePath: string) => void;
}

const Contact: React.FC<ContactProps> = ({ setBackgroundImage }) => {
  setBackgroundImage("contact");

  //@ts-ignore
  const { logged } = useLogged();
  //@ts-ignore
  const { auth } = useAuth();

  const [messageSent, setMessageSent] = useState<boolean>(false);

  const form = useRef();
  const onSubmit = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_d0tbzsz",
        "template_bxyh79a",
        // @ts-ignore
        form.current,
        "ttQxQM75wJU8v_Jmr"
      )
      .then(
        (result) => {
          console.log(result.text);
          setMessageSent(true);
        },
        (error) => {
          console.log(error.text);
        }
      );

    setClientName("");
    setClientEmail("");
    setClientMessage("");
  };

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  return (
    <div className="contact-me">
      <div className="responsiveContact justify-between contactMeText">
        <div className="contactPlace text-center flex-1">
          <div className="contactForm flex-1">
            <h1 className="text-3xl">Send us a message!</h1>
            {/* @ts-ignore */}
            <form ref={form} onSubmit={onSubmit}>
              <div className="formElementContact">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="inputText"
                  placeholder="John Doe"
                  required
                  readOnly={logged}
                  disabled={logged}
                  value={logged ? auth.firstname : clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  name="user_name"
                />
              </div>
              <div className="formElementContact">
                <label htmlFor="name">Email:</label>
                <input
                  type="text"
                  className="inputText"
                  placeholder="john.doe@example.com"
                  required
                  readOnly={logged}
                  disabled={logged}
                  value={logged ? auth.email : clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  name="user_email"
                />
              </div>
              <div className="formElementContact">
                <label htmlFor="name">Message:</label>
                <textarea
                  className="inputText"
                  placeholder="Hello! I would like to ask about..."
                  required
                  value={clientMessage}
                  onChange={(e) => setClientMessage(e.target.value)}
                  name="message"
                />
              </div>
              <button className="chooseElement">SEND MESSAGE</button>
            </form>
          </div>
        </div>
        <div className="flex-1 ml-10 text-center flex flex-col">
          <div className="flex-1">
            {messageSent && (
              <div>
                <h3 className="text-xl font-semibold">
                  Your message has been sent!
                </h3>
                <br />
                <p>
                  I appreciate your interest and will reply as soon as possible.
                </p>
                <p>
                  In the meantime, feel free to explore more of my work or
                  connect with me on GitHub and LinkedIn.
                </p>
              </div>
            )}
          </div>
          <div>
            <div className="feelFree text-xl font-semibold">
              Feel free to connect with me through the following channels:
            </div>
            <div className="flex">
              <div className="externalLink">
                <div>
                  <AiFillGithub size={40} />
                </div>
                <a
                  className="externalLinkText"
                  href="https://github.com/zprzemek378"
                >
                  GitHub
                </a>
              </div>
              <div className="externalLink">
                <div>
                  <AiFillLinkedin size={40} />
                </div>
                <a
                  className="externalLinkText"
                  href="https://www.linkedin.com/in/przemys%C5%82aw-zieli%C5%84ski-b486aa283/"
                >
                  LinkedIn
                </a>
              </div>
              <div className="externalLink">
                <div>
                  <BiLogoGmail size={40} />
                </div>
                <a
                  className="externalLinkText"
                  href="mailto: zprzemek378@gmail.com"
                >
                  Gmail
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
