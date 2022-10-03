import { Meta, Story } from "@storybook/react";
import NoteCard, { NoteCardProps } from "../components/NoteCard";

export default {
  title: "NoteCard",
  component: NoteCard,
} as Meta;

const Template: Story<NoteCardProps> = (args: any) => <NoteCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  noteFrontMatter: {
    title: "Abstract Factory",
    cover: "/images/covers/abstract-factory.jpg",
  },
};

export const NoCover = Template.bind({});
NoCover.args = {
  noteFrontMatter: {
    title: "Abstract Factory",
  },
};
