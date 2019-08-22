import { h } from 'preact';
import style from './style';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import Typography from 'preact-material-components/Typography';
import 'preact-material-components/Typography/style.css';

const Home = () => (
	<div class={style.home}>
		<div>
			<LayoutGrid>
				<LayoutGrid.Inner>
					<LayoutGrid.Cell cols="12">
						<div><Typography headline4>Hi, I'm Shamil.</Typography></div>
						<div><Typography headline5>I'm a London-based software engineer, currently working as a Production Engineer.</Typography></div>
					</LayoutGrid.Cell>
				</LayoutGrid.Inner>
			</LayoutGrid>
		</div>
		<div>
			<LayoutGrid>
				<LayoutGrid.Inner>
					<LayoutGrid.Cell cols="6">
						<div>
							<p>
                            I'm a engineer / SRE / etc. and I believe in abstracting ideas to see what works best for each situation. Putting my ScrumMaster hat on, no team
                            is ever the same, and I am focused on helping teams produce maximum value. When it comes to engineering challenges, I always defer to my experience as an engineer but also rely on my operational knowledge to complement solutions.
							</p>
							<p>
                            In my spare time I write web and service applications as well as entertain deep discussions about software patterns
                            and architures - a <a href="http://www.amazon.co.uk/dp/0321127420">book</a> by Martin Fowler is always within reach!
							</p><p /><p>
                            I'm a maintainer of an IRC bot residing on multiple <abbr title="Internet Relay Chat">IRC</abbr> networks,
                            providing fun and utility functionalities
                            and have released a few <a href="https://github.com/theTeddyBear/textual-whisper">themes</a> for the Textual IRC client on OS X.
                            Most of my projects are private, as I tend to write for specific things in mind, but I sometimes release my code on <a href="https://github.com/UbiquitousBear/">GitHub</a>.
							</p>
							<p>
							Beside coding, I'm also heavily involved in infrastructure and operations. Yes, I have fun setting up kubernetes clusters and administering them. This website is hosted on a personal k8s cluster, with namespaces separating projects. I follow a full SDLC from issue tracking to deployment using CI and CD pipelines.
							</p>
							<p>
                            In my spare time, I'm learning functional programming with Scala simply because I recognise that the different paradigms
                            enable for a unique advantages.. but it always forces me to think in a completely new way.
							</p>
							<p>
                            Stepping away from the computer, I am learning new (human) languages, enjoy reading and weight lifting.
							</p>
							<p>
                            Oh, and by the way, did I mention that I love flying? I have a pilot's license and I've always said that my office is in the sky!
							</p>
						</div>
					</LayoutGrid.Cell>
					<LayoutGrid.Cell cols="6">
						<div>
							<LayoutGrid>
								<LayoutGrid.Inner>
									<LayoutGrid.Cell cols="12">
										<div><Typography headline6><a href="#">A brief to the Specification Pattern</a></Typography></div>
										<div><Typography body2>An overview of a pattern that literally has one job: is this true or false?</Typography></div>
									</LayoutGrid.Cell>
									<LayoutGrid.Cell cols="12">
										<div><Typography headline6><a href="#">Rescued by Doctrine Collections' Criteria</a></Typography></div>
										<div><Typography body2>How I applied criteria to Doctrine collections before or after loading data.</Typography></div>
									</LayoutGrid.Cell>
									<LayoutGrid.Cell cols="12">
										<div><Typography headline6><a href="#">Lorem Ipsum</a></Typography></div>
										<div><Typography body2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography></div>
									</LayoutGrid.Cell>
								</LayoutGrid.Inner>
							</LayoutGrid>
						</div>
					</LayoutGrid.Cell>
				</LayoutGrid.Inner>
			</LayoutGrid>
		</div>
	</div>
);

export default Home;
