import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export default function MainMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">

      <MenuButton className="bg-gray-800 p-1 py-0 mt-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-700">
        <img
          src={'src/assets/c-solo-logo.svg'}
          alt="Ícone de localização"
          className="h-10 w-10 bg-gray-100 rounded-full cursor-pointer"
        />
      </MenuButton>


      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Minha Conta
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Suporte Remoto
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Borderô de Viagem
            </a>
          </MenuItem>
          {/* <form action="#" method="POST"> */}
          <MenuItem>
            <button
              type="submit"
              className="block bg-gray-300 w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              onClick={() => { localStorage.removeItem('user'); location.reload(); }}
            >
              Sair
            </button>
          </MenuItem>
          {/* </form> */}
        </div>
      </MenuItems>
    </Menu>
  )
}