import { ActionIcon, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { IconWrapper } from "@/components/IconWrapper/IconWrapper";
import { cardTextFormActions } from "@/features/cards/components/CardTextForm/formActions";
import { fetchWord } from "@/features/dictionary/api/fetchWord";

export const DictionaryForm = () => {
	const theme = useMantineTheme();

	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			word: "",
		},
	});

	const handleSubmit = async ({ word }: { word: string }) => {
		const response = await fetchWord(word);

		cardTextFormActions.setValues({
			front: word,
			back: response?.definition ?? "",
		});
	};

	return (
		<form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
			<TextInput
				placeholder="Word"
				variant="filled"
				radius="lg"
				key={form.key("word")}
				leftSection={<IconWrapper icon={IconSearch} />}
				rightSection={
					<ActionIcon
						type="submit"
						size={32}
						radius="xl"
						color={theme.primaryColor}
						variant="filled"
						loading={form.submitting}
					>
						<IconArrowRight size={18} stroke={1.5} />
					</ActionIcon>
				}
				{...form.getInputProps("word")}
			/>
		</form>
	);
};
