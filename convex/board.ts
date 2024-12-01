import {v} from "convex/values";
import {mutation, query} from "./_generated/server";

const images=[
    "./placeholder/1.svg",
    "./placeholder/2.svg",
    "./placeholder/3.svg",
    "./placeholder/4.svg",
    "./placeholder/5.svg",
    "./placeholder/6.svg",
    "./placeholder/7.svg",
    "./placeholder/8.svg",
    "./placeholder/9.svg",
    "./placeholder/10.svg",
    "./placeholder/11.svg",
    "./placeholder/12.svg",
    "./placeholder/13.svg",
    "./placeholder/14.svg",
    "./placeholder/15.svg",
    "./placeholder/16.svg",
    "./placeholder/17.svg",
]

export const create=mutation({
    args:{
        orgId:v.string(),
        title: v.string(),
    },
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }
        const imageUrl=images[Math.floor(Math.random()*images.length)];
        const board=await ctx.db.insert("boards",{
            title:args.title,
            orgId:args.orgId,
            authorId:identity.subject,
            authorName:identity.name!,
            imageUrl:imageUrl,
        })
        return board;
    }
    
});

export const remove=mutation({
    args:{
        id:v.id("boards")
    },
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }
        // TODO: Check if the user is deleting favorite board
        const userId=identity.subject;
        const existingFavorite=await ctx.db.query("userFavorites")
            .withIndex("by_user_board",(q)=>
                q.eq("userId",userId)
                 .eq("boardId",args.id)
        )
        .unique();
        if(existingFavorite){
            await ctx.db.delete(existingFavorite._id);
        }
        await ctx.db.delete(args.id);
    }
})


export const update=mutation({
    args:{
        id:v.id("boards"),
        title:v.string(),
    },
    handler:async(ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }
        const title=args.title.trim();
        if(!title){
            throw new Error("Title cannot be empty");
        }
        if(title.length>60){
            throw new Error("Title is too long");
        }
        const board=await ctx.db.patch(args.id,{
            title:args.title
        });
        return board;
    }
});


export const favorite=mutation({
    args:{
        id:v.id("boards"),
        orgId:v.string(),
    },
    handler: async (ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }
        const board=await ctx.db.get(args.id);
        if(!board){
            throw new Error("Board not found");
        }
        const userId=identity.subject;
        const existingFavorite=await ctx.db.query("userFavorites")
        .withIndex("by_user_board_org",(q)=>
            q.eq("userId",userId)
             .eq("boardId",board._id)
             .eq("orgId",args.orgId)
        )
        .unique();

        if(existingFavorite){
            throw new Error("Already favorited");
        }
        await ctx.db.insert("userFavorites",{
            userId,
            boardId:board._id,
            orgId:args.orgId,
        });
        return board;
    }
});

export const unfavorite=mutation({
    args:{
        id:v.id("boards")
    },
    handler: async (ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not authenticated");
        }
        const board=await ctx.db.get(args.id);
        if(!board){
            throw new Error("Board not found");
        }
        const userId=identity.subject;
        const existingFavorite=await ctx.db.query("userFavorites")
        .withIndex("by_user_board",(q)=>
            q.eq("userId",userId)
             .eq("boardId",board._id)
            //  Check if org id needed
        )
        .unique();

        if(!existingFavorite){
            throw new Error("Not favorited");
        }
        await ctx.db.delete(existingFavorite._id);
        return board;
    }
});


export const get=query({
    args:{
        id:v.id("boards")
    },
    handler:async(ctx,args)=>{
        const board=await ctx.db.get(args.id);
        return board;
    }
})