-- SQLite



select * from gemCharacters;

-- delete from gemCharacters
-- where gemId in (2,3);


select * from gemCharacters
where gemId > 6
order by name desc limit 3;

create table users (
    userId integer primary key,
    email text not null
);

-- insert into users (email) values ('trshelto@iu.edu');

select * from users;

create table userSavedGems (
  savedGemId integer primary key,
  userId integer,
  gemId integer
);

select * from userSavedGems;

insert into userSavedGems (gemId, userId)
VALUES
(1, 4);
-- (1, 4),
-- (1, 7),
-- (1, 8),
-- (1, 10),
-- (2, 5),
-- (2, 9),
-- (2, 11);


select
    users.userId,
    users.email,
    gc.gemId,
    gc.name
from users
left join userSavedGems usg
    on users.userId = usg.userId
left join gemCharacters gc
    on usg.gemId = gc.gemId
;

select
    usg.savedGemId,
    gc.name
from userSavedGems usg
left join gemCharacters gc
    on usg.gemId = gc.gemId
where usg.userId = 2;


-- Create (insert)
    insert into gemCharacters (name) values ('Stephen');
-- Read (select)
    select 
        gc.*, 
        gc.gemId realId 
    from gemCharacters gc;
-- Update
    update gemCharacters
        set name = 'Steven'
    where gemId = 13;
-- Delete (delete)
   delete from gemCharacters
   where gemId = 15;
