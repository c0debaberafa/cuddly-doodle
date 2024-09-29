use anchor_lang::prelude::*;

declare_id!("23Z7Jqq6LYZeSts5KJeQMyFsB9HMB7CxEZbqJ9uNkrEc");

#[program]
pub mod backend {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
