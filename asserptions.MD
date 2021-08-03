#Assertions:

##General
- This program is to automate the process of adding and removing components.
- We will maintain a record of installed components and component dependencies
- Sample input should produce sample output

##A component (AKA Dependency)
    - Can Be installed explicitly in response to a command
    - Is not installed again if has already been explicitly installed
    - Can Be installed implicitly if is needed for some other component beeing installed
    - Can have Dependencies
    - A Dependency is a component
    - Can Be explicitly removed in response to a command
    - If it is needed to support other components Don't will removed as response to a command
    - Is implicitly removed if has not been explicitly installed and all the commponents that depends on it has been removed
    - Dependence is transitive.
    - If A depends on B, and B depends on C, both B and C are implicitly installed when A is explicitly installed
    - If A depends on B, and B depends on C, B and C would both be removed if A is removed and there are implicitly installed.

##Input
    - Will contain a sequense of commands
    - Each command will be in a separate line
    - Each line will contain a max of 80 characters
    - The command names (DEPEND, INSTALL, REMOVE, and LIST) always appear in uppercase starting in column one
    - Item names are case sensitive, and each is no longer than 10 characters
    - Item names are separated from the command name and each other by one or more spaces.
    - All appropriate DEPEND commands will appear before the occurrence of any INSTALL dependencies.
    - The end of the input is marked by a line that contains only the word END.
    - The line `DEPEND item1 item2 [item3...]` will stablish the fact that item1 depends on item2 (and item3 ...)
    - The line `INSTALL item1` will produce the explicit instalation of the item1 component and all his dependencies if are not previusly instaled
    -`REMOVE item1` remove item1, and those on which it depends, if possible
    - `LIST` list the names of all currently-installed components

##Output
    - Echo each line of input
    - Follow each echoed INSTALL or REMOVE line with the actions taken in response
    - The actions are given in the proper order
    - No output, except the echo, is produced for a DEPEND command or the line containing END