import { useState } from 'react'

const useMenuToggle = () => {
	const [menuOpen, setMenuOpen] = useState(false)

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	return { menuOpen, toggleMenu }
}

export default useMenuToggle
