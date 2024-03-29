import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars4Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

const today = new Date();

const navigation = [
  { name: 'Hem', href: '/dashbord' },
  { name: 'Mina projekt', href: '/project' },
  { name: 'Lägg till tid', href: '/report' },
  { name: 'Lägg till kommentar', href: '/comment_ChangeStatus' },
  { name: 'Ändra tidrapport', href: '/EditTimeReports' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar(props) {

  const peopleUrl = "http://localhost:5000/people";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [peoples2, setPeoples] = useState([]);

  useEffect(() => {
    fetch(peopleUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(true);
          setPeoples(result);
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
  }, []);

  const loggedInUserId = localStorage.getItem("userEmail"); 
  const loggedInUser = peoples2.find(person => person.Email === loggedInUserId);

  return (
    <>
    <Disclosure 
      as="nav" 
      className="bg-cyan-900"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}

                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon  //close symbol X on mobile menu
                      className="block h-6 w-6" 
                      aria-hidden="true" 
                    />
                  ) : (
                    <Bars4Icon  //mobile menu - on small screen
                      className="block h-6 w-6" 
                      aria-hidden="true" 
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img  //profil picture
                    className="block h-8 w-auto lg:hidden"
                    src="https://th.bing.com/th/id/R.629bc3693629b7eb68296578ee197adb?rik=c1HFwiKOYmJuqw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_96226.png&ehk=X06chRljGNcbA57wrqOkQqFny3nfnuKOMl0IXKXjdNw%3d&risl=&pid=ImgRaw&r=0"
                    alt="Your Company"
                  />
                  <img  //profil picture
                    className="hidden h-8 w-auto lg:block"
                    src="https://th.bing.com/th/id/R.629bc3693629b7eb68296578ee197adb?rik=c1HFwiKOYmJuqw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_96226.png&ehk=X06chRljGNcbA57wrqOkQqFny3nfnuKOMl0IXKXjdNw%3d&risl=&pid=ImgRaw&r=0"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block text-white">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink  //has active link built into it
                        key={item.name}
                        to={item.href}
                        className={({isActive}) => {
                          return 'rounded-md px-3 py-2 text-sm font-medium no-underline ' +
                          (!isActive 

                            ? 'text-white hover:bg-cyan-700 hover:text-white' 

                            : 'bg-cyan-700 text-white' )
                        }}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon 
                    className="h-6 w-6" 
                    aria-hidden="true" 
                  />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={loggedInUser?.ProfileImage.url}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#/MyProfil'
                            className={classNames(active ? 'bg-gray-300' : '', 'block px-4 py-2 text-sm text-black')}
                          >
                            Min profil
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#/Settings'
                            className={classNames(active ? 'bg-gray-300' : '', 'block px-4 py-2 text-sm text-black')}
                          >
                            Inställningar
                          </a>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                      {({ active }) => (
                            <a
                              href='http://localhost:3000'
                              className={classNames('block px-4 py-2 font-medium text-sm text-black no-underline ', active ? ' bg-cyan-600 text-white ' : '')}
                              onClick={() => { localStorage.clear();}
                            }>
                              Logga ut
                            </a>
                          )}
                        {/* {({ active }) => (
                          <a
                            href='#/LogOut'
                            className={classNames(active ? 'bg-gray-300' : '', 'block px-4 py-2 text-sm text-black')}
                          >
                            Logga ut
                          </a>
                        )} */}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel 
            className="sm:hidden text-white">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <NavLink  //has active link built into it
                  key={item.name}
                  to={item.href}
                  className={({isActive}) => {
                    return 'block px-3 py-2 rounded-md text-base font medium no-underline ' +
                    (!isActive 
                      ? ' text-white hover:bg-cyan-700 hover:text-white' 
                      : 'bg-cyan-700 text-white' )
                  }} 
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </>
  );
};
