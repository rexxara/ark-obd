import React, { useContext } from "react";
import { GlobalContext } from "../Context/global";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemButton from '@mui/material/ListItemButton';
interface IProps {

}
export default function BLeList(props: IProps) {
    const { context, dispatch } = useContext(GlobalContext);
    return <List>
        {context.infoList.map(v => {
            return <ListItem >
                <ListItemButton
                    selected={context.current === v.Name}
                    onClick={ev => {
                        dispatch?.({ type: 'current', payload: v.Name })
                    }}
                >
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={v.Name}
                        secondary={v.Location}
                    />
                </ListItemButton>
            </ListItem>
        })}
    </List>
}