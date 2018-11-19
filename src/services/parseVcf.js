/**
 * @copyright Copyright (c) 2018 Team Popcorn <teampopcornberlin@gmail.com>
 *
 * @author Team Popcorn <teampopcornberlin@gmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import Contact from '../models/contact'
import Store from '../store/index'

export default function parseVcf(data = '', addressbook) {
	let regexp = /BEGIN:VCARD[\s\S]*?END:VCARD/mgi
	let vCards = data.match(regexp)

	if (!vCards) {
		console.debug('Error during the parsing of the following vcf file: ', data)
		return []
	}

	Store.dispatch('setTotal', vCards.length)

	// Not using map because we want to only push valid contacts
	// map force to return at least undefined
	return vCards.reduce((contacts, vCard) => {
		try {
			// console.log(vCards.indexOf(vCard))
			let contact = new Contact(vCard, addressbook)
			contacts.push(contact)
		} catch (e) {
			// Parse error! Do not stop here...
			Store.dispatch('incrementDenied')
			console.error(e)
		}
		return contacts
	}, [])
}
