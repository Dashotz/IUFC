export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author?: string
  image?: string
}

const posts: Post[] = [
  {
    slug: 'welcome-to-our-blog',
    title: 'Welcome to Imus United Football Club Blog!',
    date: '2024-01-15',
    author: 'Team Manager',
    excerpt: 'We are excited to launch our official blog where we will share updates, match reports, and team news.',
    image: '/images/team/team-1.jpg',
    content: `
      <p>Welcome to the official Imus United Football Club blog! We are thrilled to have this platform to connect with our fans and share the latest news from our team.</p>
      
      <h2>What to Expect</h2>
      <p>On this blog, you'll find:</p>
      <ul>
        <li>Match reports and highlights</li>
        <li>Player interviews and features</li>
        <li>Team news and updates</li>
        <li>Behind-the-scenes content</li>
        <li>Upcoming fixtures and events</li>
      </ul>
      
      <p>Stay tuned for regular updates and make sure to follow us on <a href="https://www.facebook.com/imusunitedfootballclub" target="_blank" rel="noopener noreferrer">Facebook</a>!</p>
    `,
  },
  {
    slug: 'season-kickoff-2024',
    title: 'Season Kickoff 2024',
    date: '2024-01-20',
    author: 'Coach',
    excerpt: 'Our team is ready for an exciting new season. Read about our preparations and goals for 2024.',
    image: '/images/team/team-2.jpg',
    content: `
      <p>The new season is upon us, and we couldn't be more excited! After months of preparation, our team is ready to hit the field.</p>
      
      <h2>Pre-Season Training</h2>
      <p>We've had an intensive pre-season training camp focusing on fitness, tactics, and team cohesion. The players have shown great commitment and determination.</p>
      
      <h2>Our Goals</h2>
      <p>This season, we're aiming to:</p>
      <ul>
        <li>Build on last season's successes</li>
        <li>Develop our young talent</li>
        <li>Compete at the highest level</li>
        <li>Entertain our amazing fans</li>
      </ul>
      
      <p>Thank you for your continued support. Let's make this season one to remember!</p>
    `,
  },
  {
    slug: 'victory-against-rivals',
    title: 'Victory Against Rivals',
    date: '2024-01-25',
    author: 'Match Reporter',
    excerpt: 'A thrilling match that ended in a 3-1 victory. Read the full match report here.',
    image: '/images/team/team-3.jpg',
    content: `
      <p>What a match! Our team delivered an outstanding performance against our rivals, securing a well-deserved 3-1 victory.</p>
      
      <h2>Match Summary</h2>
      <p>The game started with high intensity from both sides. We took the lead in the 15th minute with a brilliant strike from our forward. The opposition equalized just before halftime, but we came back stronger in the second half.</p>
      
      <h2>Key Moments</h2>
      <ul>
        <li>15' - Opening goal from our star striker</li>
        <li>42' - Opposition equalizer</li>
        <li>58' - We regained the lead with a header from a corner</li>
        <li>75' - Sealed the victory with a counter-attack goal</li>
      </ul>
      
      <p>The team showed great character and determination throughout the match. This victory is a testament to our hard work and preparation.</p>
    `,
  },
]

export function getPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}
