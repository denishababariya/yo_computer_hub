import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "../styles/a_style.css";
import com_vector from "../img/aboutus_vector.png";
import Innovation from "../img/Innovation.png"
import safety from "../img/safety.png"
import operator from "../img/operator.png"
import fast_delivery from "../img/fast-delivery.png"
import user from "../img/about_user.png"
import product from "../img/about_product.png"
import star from "../img/about_star.png"
import headphone from "../img/about_headphone.png"
import { Link } from 'react-router-dom';

const AboutUs = () => {
	// Data remains the same, but the emoji for 'Quality' is adjusted for the theme
	const values = [
		{
			icon: <img src={Innovation} alt="Innovation" />,
			title: 'Innovation',
			description: 'We constantly seek the latest technology and trends to bring you cutting-edge products that enhance your digital lifestyle.'
		},
		{
			icon: <img src={safety} alt="Quality" />,
			title: 'Quality',
			description: 'Every product is carefully selected and tested to meet our high standards of performance, durability, and reliability.'
		},
		{
			icon: <img src={operator} alt="Customer First" />,
			title: 'Customer First',
			description: 'Your satisfaction is our priority. We provide exceptional support and service to ensure your complete happiness.'
		},
		{
			icon: <img src={fast_delivery} alt="Fast Delivery" />,
			title: 'Fast Delivery',
			description: 'We understand you can\'t wait to use your new gear. That\'s why we offer express shipping and reliable delivery.'
		}
	];

	const stats = [
		{ number: 100, suffix: "K+", label: "Happy Customers", icon: user },
		{ number: 5000, suffix: "+", label: "Products", icon: product },
		{ number: 50, suffix: "+", label: "Top Brands", icon: star },
		{ number: 24, suffix: "/7", label: "Customer Support", icon: headphone },
	];

	const team = [
		{
			avatar: 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png',
			name: 'John Smith',
			role: 'Founder & CEO',
			description: 'Tech enthusiast with 15+ years of experience in the computer accessories industry.'
		},
		{
			avatar: 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png',
			name: 'Sarah Johnson',
			role: 'Head of Product',
			description: 'Expert in identifying emerging tech trends and curating the perfect product lineup.'
		},
		{
			avatar: 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png',
			name: 'Mike Chen',
			role: 'Customer Success',
			description: 'Dedicated to ensuring every customer has an exceptional experience with our products.'
		},
		{
			avatar: "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png",
			name: 'Lisa Rodriguez',
			role: 'Operations Manager',
			description: 'Ensures smooth operations and fast delivery of products to customers worldwide.'
		}
	];

	// Counter Component
	const Counter = ({ end, duration = 2000 }) => {
		const [count, setCount] = React.useState(0);
		const ref = React.useRef();
		const started = React.useRef(false);

		React.useEffect(() => {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting && !started.current) {
						started.current = true;

						let start = 0;
						const increment = end / (duration / 16.6);

						const updateCounter = () => {
							start += increment;
							if (start < end) {
								setCount(Math.floor(start));
								requestAnimationFrame(updateCounter);
							} else {
								setCount(end); // final value
							}
						};

						requestAnimationFrame(updateCounter);
					}
				},
				{ threshold: 0.4 }
			);

			if (ref.current) observer.observe(ref.current);

			return () => observer.disconnect();
		}, [end, duration]);

		return <span ref={ref}>{count}</span>;
	};

	return (
		<div className="bg-dark-theme text-light-gray">
			{/* Our Story Section */}
			<div className='story-section' >
				<Container className="py-3">
					<Row className="align-items-center">
						<Col lg={6} className="mb-md-4 mb-2 mb-lg-0">
							<div className="story-content">
								<h2 className="story-header-title">Our Story</h2>
								<p>
									Founded with a passion for technology and innovation, we started our journey in **2015** with a simple mission: to provide high-quality computer accessories that enhance your digital experience.
								</p>
								<p>
									What began as a small startup has grown into a trusted name in the tech accessories industry. We've served over **100,000+ satisfied customers** worldwide, delivering premium products that combine cutting-edge technology with exceptional value.
								</p>
								<p>
									Today, we continue to push boundaries, partnering with leading brands like Logitech, Razer, and Corsair to bring you the latest innovations in gaming peripherals, audio equipment, and workspace solutions.
								</p>
							</div>
						</Col>
						<Col lg={6}>
							<img src={com_vector} alt="Computer Vector" className="img-fluid story-image-vector" />
						</Col>
					</Row>
				</Container >
			</div>

			{/* Values Section */}
			<div className='pb-2'>
				<Container>
					<div className="my-lg-4 my-md-3 my-2 ">
						<div className='text-center mb-md-5 mb-3'>
							<h2 className="section-title">Our Core Values</h2>
							<span className="section-header-line"></span>
						</div>
						<Row className="g-4">
							{values.map((value, index) => (
								<Col key={index} lg={3} sm={6}>
									<Card className="value-card-dark border-0 p-0">
										<Card.Body className='p-4'>
											<div className="value-icon-dark">{value.icon}</div>
											<h3 className="value-title-dark">{value.title}</h3>
											<p className="value-description-dark">{value.description}</p>
										</Card.Body>
									</Card>
								</Col>
							))}
						</Row>
					</div>
				</Container>
			</div>

			{/* Stats Section */}
			<div style={{ backgroundColor: "#262626" }}>
				<Container>
					<Row className="text-left">
						<div className="py-3">
							<div className="row h-100">
								<div className="col-lg-5 mb-md-4 mb-2 mb-lg-0 px-3">
									<div className="stats-intro">
										<h2 className="stats-main-title">We have the experience</h2>
										<div className="stats-underline"></div>
										<p className="stats-description">
											We are experienced in delivering premium computer accessories that transform your digital workspace. With cutting-edge technology and a commitment to quality, we have served 100K+ customers worldwide. Our extensive catalog of 5000+ products from 50+ top brands ensures you get the best gaming gear, peripherals, and accessories with 100% customer satisfaction.
										</p>
									</div>
									<div className="mt-5">
										<h3 className="stats-main-title">Successful partnerships</h3>
										<p className="stats-description">
											Our partnership with leading brands like Logitech, Razer, Corsair, and HyperX brings you the latest innovations in gaming and computing. We work with a team dedicated to excellence, ensuring every product meets our high standards and delivers unmatched performance for gamers, creators, and professionals.
										</p>
									</div>
								</div>
								<div className="col-lg-7 px-3">
									<div className="row g-4 h-100">
										{stats.map((stat, index) => (
											<div key={index} className="col-6 a_state_card_col p-0">
												<div className="stat-card-modern p-0">

													{/* Icon + Glow Background */}
													<div
														className="stat-icon-wrapper"
													>
														<img src={stat.icon} alt={stat.label} />
													</div>

													{/* Number + Label */}
													<div className="stat-content">
														<div className="stat-number-modern">
															<Counter end={stat.number} />
															{stat.suffix}
														</div>
														<div className="stat-label-modern">{stat.label}</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</Row>
				</Container>
			</div>
			<style>
				{`
					@media (max-width: 575px) {
						.col-custom-padding {
						padding-left: 1.5rem !important;
						padding-right: 1.5rem !important;
						}
					}
					`}
			</style>

			{/* Team Section */}
			<Container>
				<div className="my-lg-4 my-md-3 my-2 py-3 improved-section-container">
					<div className='text-center mb-md-5 mb-3'>
						<h2 className="section-title">Meet Our Team</h2>
						<span className="section-header-line"></span>
					</div>
					<Row className="g-4">
						{team.map((member, index) => (
							<Col key={index} lg={3} md={6} sm={6} className="col-custom-padding">
								<Card className="team-card-modern border-0">
									<Card.Body className='p-0 d-flex flex-column align-items-center'>
										<img src={member.avatar} alt={member.name} className="team-avatar-modern" />
										<h3 className="team-name-modern">{member.name}</h3>
										<p className="team-role-modern">{member.role}</p>
										<p className="team-description-modern">{member.description}</p>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</Container>

			{/* CTA Section */}
			<Container className='pb-5'>
				<div className="cta-section-modern">
					<h2 className="section-title">Ready to Upgrade Your Setup?</h2>
					<p className="cta-description-modern">
						Explore our extensive collection of premium computer accessories and gaming gear.
					</p>
					<button className="cta-button-modern">
						<Link to="/shop" className='text-white text-decoration-none'>Shop Now</Link></button>
				</div>
			</Container>

		</div>
	);
};

export default AboutUs;