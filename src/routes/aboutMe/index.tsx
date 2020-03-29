import { Component, h } from 'preact'
import { Container, Row } from 'reactstrap'
import * as style from './style.css'


class AboutMe extends Component {

	public componentDidMount() {
		document.title = 'About Shamil'
	}

	public render() {
		return (
			<div>
				<Container>
					<div class={style.postHeading}>
						<h1>About Me</h1>
					</div>
					<p>
						I'm a <abbr title="Site Reliability Engineer">SRE</abbr> at a tier 1 investment bank in London. 
					</p>
					<p>
						I've previously been a software and a devops / infrastructure operations engineer, and have worked on building reliable, scalable distributed systems to meet large system requirements in both traffic volume and design breadth.
					</p>
					<p>
						I'm a maintainer of an IRC bot residing on multiple <abbr title="Internet Relay Chat">IRC</abbr> networks,
						providing fun and utility functionalities
						and have released a few <a href="https://github.com/UbiquitousBear/textual-whisper">themes</a> for the Textual IRC client on OS X.
						Most of my projects are private, as I tend to write for specific things in mind, but I sometimes release my code on <a href="https://github.com/UbiquitousBear/">GitHub</a>.
					</p>
					<p>
						In my spare time, I'm learning functional programming with Scala simply because I recognise that the different paradigms
						enable for a unique advantages.. but it always forces me to think in a completely new way.
					</p>
					<p>
						Stepping away from the computer, I am learning new (human) languages, enjoy reading and weight lifting.
					</p>
					<p>
						I also love flying - I have a pilot license and I've always said that my office is in the sky!
					</p>
					<div>
						<hr />
						<ul>
							<li><a href="https://github.com/UbiquitousBear/">GitHub: @UbiquitousBear</a></li>
							<li><a href="https://stackoverflow.com/users/114865/bear">StackOverflow: @bear</a></li>
							<li><a href="https://www.linkedin.com/in/shamil-nunhuck/">LinkedIn: Shamil Nunhuck</a></li>
							<li><a href="https://twitter.com/shamil_nunhuck">Twitter: @shamil_nunhuck</a></li>
						</ul>
					</div>
				</Container>
			</div>
		)
	}
}

export default AboutMe
