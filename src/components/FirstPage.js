import React from 'react';
import '../index.css';
import header from './F_img/frontPage-header.jpg';
import firstImg from './F_img/Systembuilders1.jpg';
import secondImg from './F_img/Systembuilders2.jpg';
import thirdImg from './F_img/Systembuilders3.jpg';
import forthImg from './F_img/Systembuilders4.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SocialIcon } from 'react-social-icons';

export default function FirstPage () {

    return(
        <div  className='backgroundColor'>
            <img src={header} className='picHeader' alt="Office representation" />
            <a href="http://localhost:3000/login"><button className="login-button">Login</button></a>

            <MainContent />
            <FooterText/>
        </div>
    );
};


function MainContent () {

    return(
        <div>

          <section className="card-containerFP">

            <div className="col">
                
                    <div className="card">
                        <img src={firstImg} className="card-img-top" alt="Welding" />
                        <div className="card-body">
                            <h5><strong>Welcome to Systembuilders AB</strong></h5>
                            <p>A leading construction firm with a passion
                            for creating stunning buildings that stand the test of time. 
                            Our team has years of experience in the industry and is committed to 
                            delivering projects that exceed expectations.</p>
                            <br/>
                        </div>
                        </div>

            </div>

            <div className="col">

                    <div className="card">
                    <img src={secondImg} className="card-img-top" alt="Luxury apartments" />
                        <div className="card-body">
                            <h5><strong>Project Stockholm</strong></h5>
                            <p>We recently completed an exclusive project in Stockholm, 
                            consisting of 35 beautifully crafted bungalows that boast luxury and comfort. 
                            Our focus on customer satisfaction has been at the forefront of every project we undertake, 
                            and our commitment to quality is evident in every detail.</p>
                            <br/>
                        </div>
                    </div>

            </div>

            <div className="col">

                    <div className="card">
                        <img src={thirdImg} className="card-img-top" alt="Sunny apartment, simple interior design" />
                        <div className="card-body">
                            <h5><strong>Current projects</strong></h5>
                            <p>Currently, we are working on several exciting projects, including a 150 apartment building 
                            in the heart of Oslo, a renovation project at London Bridge, and a renovation project at 
                            the iconic Eiffel Tower. Our innovative approach and attention to detail ensure that these 
                            projects will be completed to the highest standards.</p>
                            <br/>
                        </div>
                    </div>

            </div>

            <div className="col">

                    <div className="card">
                        <img src={forthImg} class="card-img-top" alt="Hands coming together with Lego people" />
                        <div className="card-body">
                            <h5><strong>Values</strong></h5>
                            <p>At our company, we understand that our employees are the backbone of our success, 
                            and we prioritize their well-being by offering a supportive and inclusive work environment. 
                            We provide ongoing training and development opportunities to help our team stay up-to-date 
                            with the latest technologies and techniques.</p>
                            <br/>
                        </div>
                    </div>

            </div>

        </section>
      </div>
    );
};

const FooterText = () => {
    return (
        <div className='footer-container'>

            <p className='leftFooter'>
                <strong>Email: </strong>
                <br />
                <a href='mailto:Systembuilders@Email.com' target='_blank'>Systembuilders@Email.com</a>
            </p>
            <p className='rightFooter'>
                <strong>Social media: </strong>
                <br />
                <div className='contact-socialMedia'>
                    <SocialIcon url="https://twitter.com/" target='_blank' />
                    <SocialIcon url="https://instagram.com/" target='_blank' />
                    <SocialIcon url="https://linkedin.com/" target='_blank' />
                    <SocialIcon url="https://facebook.com/" target='_blank' />
                    <SocialIcon url="https://youtube.com/" target='_blank' />
                </div>
            </p>
        </div>
    );
};