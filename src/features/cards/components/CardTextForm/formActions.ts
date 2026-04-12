import { createFormActions } from "@mantine/form";
import type { CardTextContentInput } from "../../types";

export const cardTextFormActions =
	createFormActions<CardTextContentInput>("card-text-form");
