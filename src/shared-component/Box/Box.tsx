import React, { useState } from "react";
import './Box.css';
import { ExpandMore, ExpandLess, Delete } from "@mui/icons-material";
import { Grid, IconButton } from '@mui/material';

interface BoxProps {
    array?: any[];
    titulo?: string;
    renderItem?: (item: any, index: number) => React.ReactNode;
    onDelete?: (item: any, index: number) => void;
}

const Box: React.FC<BoxProps> = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="AppBox">
            <div className="HeaderBox">
                {props.titulo}
                <IconButton className="ExpandButton" onClick={toggleExpanded}>
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </div>
            <ul className="BoxList" style={{ maxHeight: isExpanded ? 'none' : '100px' }}>
                {
                    props.array?.map((item, index) => (
                        <li key={index} className="BoxListItem">
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item className="BoxListItemContent">
                                    {props.renderItem ? props.renderItem(item, index) : item}
                                </Grid>
                                <Grid item>
                                    <IconButton 
                                        className="DeleteButton" 
                                        size="small"
                                        onClick={() => props.onDelete && props.onDelete(item, index)}>
                                        <Delete style={{ color: 'red' }} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Box;