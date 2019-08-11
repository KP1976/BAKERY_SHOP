import React from 'react';
import aboutUsImgSmall from '../img/about_us_picture_small.jpg';
import aboutUsImgLarge from '../img/about_us_picture.jpg';

const AboutUs = () => {
	return (
		<section className="about-us" id="aboutus">
			<h2 className="about-us__title">o nas</h2>
			<hr className="title-underline" />

			<p className="about-us__text">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
				dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
			</p>
			<img
				className="about-us__image"
				srcSet={`${aboutUsImgSmall} 500w, ${aboutUsImgLarge} 1000w`}
				sizes="(max-width: 576px) 500px, (max-width: 992px) 1000px"
				src={aboutUsImgSmall}
				alt="some cakes"
			/>
			<button type="button" className="about-us__button">
				więcej
			</button>
		</section>
	);
};

export default AboutUs;
