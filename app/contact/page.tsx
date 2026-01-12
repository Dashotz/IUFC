export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Have a question or want to reach out? We'd love to hear from you!
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> contact@iufc.com</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Sports Avenue, City, State 12345</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Stay connected with us on social media for the latest updates.
          </p>
          <div className="space-y-2">
            <a href="#" className="block text-primary-600 dark:text-primary-400 hover:underline">
              Facebook
            </a>
            <a href="#" className="block text-primary-600 dark:text-primary-400 hover:underline">
              Twitter
            </a>
            <a href="#" className="block text-primary-600 dark:text-primary-400 hover:underline">
              Instagram
            </a>
            <a href="#" className="block text-primary-600 dark:text-primary-400 hover:underline">
              YouTube
            </a>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2 font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
