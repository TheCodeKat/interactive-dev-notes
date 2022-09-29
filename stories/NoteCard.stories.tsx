import NoteCard from "../components/NoteCard";

export default {
    title: 'NoteCard',
    component: NoteCard
}

const Template = (args) => <NoteCard {...args}/>

export const Primary = Template.bind({});
Primary.args = {
    noteFrontMatter: {
        title: 'Abstract Factory'
    }
}