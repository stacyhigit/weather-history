import { useCallback, useRef } from "react";

export const useDebounce = (func, delay) => {
	const timer = useRef()
	return useCallback(
		function () {
			const context = this
			const args = arguments
			clearTimeout(timer.current)
			timer.current = setTimeout(() => func.apply(context, args), delay)
		},
		[func, delay]
	)
}

export const promiseMap = (list, asyncFunc) => {
	const reducer = (promiseX, item) => promiseX
		.then(promise => asyncFunc(item)
			.then(result => promise.push(result) && promise))
	return list.reduce(reducer, Promise.resolve([]))
}

export const getTimezoneShort = (timeZone) => {
	try {
		return (new Intl.DateTimeFormat('en', {
			timeZoneName: 'short', timeZone
		}).formatToParts().find(el => el.type === 'timeZoneName') || {}).value
	} catch (err) {
		return timeZone
	}
}
