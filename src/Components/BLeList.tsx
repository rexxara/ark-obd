import React, { useContext } from "react";
import { GlobalContext } from "../Context/global";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
interface IProps {

}
export default function BLeList(props: IProps) {
    const { context, dispatch } = useContext(GlobalContext);
    return <List>
        {context.infoList.map(v => {
            return <ListItem onClick={ev => {
                dispatch?.({ type: 'current', payload: v.Name })
            }}>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText
                    primary={v.Name}
                    secondary={v.Location}
                />
            </ListItem>
        })}
    </List>
}