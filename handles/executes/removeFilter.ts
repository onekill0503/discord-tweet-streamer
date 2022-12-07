import { ActionRowBuilder, ChatInputCommandInteraction, SelectMenuBuilder } from "discord.js";
import { ICollection } from "monk";
import DB from '../../database';

const filters: ICollection = DB.get('filters');

export default async (interaction: ChatInputCommandInteraction) => {
    const filtersData = await filters.find();
        if(filtersData.length < 1){
            interaction.reply({content: `No Filters at database .`});
            return;
        }
        const selectMenu: SelectMenuBuilder = new SelectMenuBuilder()
            .setCustomId(`filters`)
            .setPlaceholder(`Select filter you want remove`)
        
        filtersData.map(v => {
            selectMenu.addOptions({
                label: v.value,
                value: v.filter_id
            })
        })

        const row: any = new ActionRowBuilder().addComponents(selectMenu);
            
        await interaction.reply({content: 'Under construction' , ephemeral: true , components: [row]});
}