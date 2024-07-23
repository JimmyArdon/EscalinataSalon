const people = [
    {
      name: 'Jimmy Albert Ardon Orellana',
      role: '.',
      imageUrl: 'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg'
    },
    {
        name: 'Elias Moises Giron Zavala',
        role: '.',
        imageUrl: 'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg'
      },
      {
        name: 'Alan Josue',
        role: '.',
        imageUrl: 'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg'
      },
      {
        name: 'Eduard Diaz',
        role: '.',
        imageUrl: 'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg'
      },
      
  ]
  
  export default function Example() {
    return (
        <div className="mt-20 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Equipo de Desarrollo</h2>
        </div>
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-1">
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 sm:gap-y-16 xl:col-span-1">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      
    )
  }
  