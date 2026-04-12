export const fetchWord = async (word: string) => {
	const response = await fetch(
		`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	try {
		const result = await response.json();
		const pronunciation: { audio: string | undefined } =
			result[0].phonetics[0].audio;
		const { definition }: { definition: string | undefined } =
			result[0].meanings[0].definitions[0];
		const { example }: { example: string | undefined } =
			result[0].meanings[0].definitions[0];
		return { pronunciation, definition, example };
	} catch {
		return { error: "word not found" };
	}
};
