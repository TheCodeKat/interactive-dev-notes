import NoteCard from "../components/NoteCard";

export default {
    title: 'NoteCard',
    component: NoteCard
}

const Template = (args) => <NoteCard {...args}/>

export const Primary = Template.bind({});
Primary.args = {
    noteFrontMatter: {
        title: 'Abstract Factory',
        cover: '/images/covers/abstract-factory.jpg'
    }
}

export const NoCover = Template.bind({});
NoCover.args = {
    noteFrontMatter: {
        title: 'Abstract Factory',
    }
}

